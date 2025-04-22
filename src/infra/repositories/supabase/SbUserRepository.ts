import { UserRepository } from "@/domain/repositories/UserRepository";
import { createClient } from "@/utils/supabase/server";
import { UserActivity } from "@/domain/entities/UserActivity";

export class SbUserRepository implements UserRepository {
  async getUserActivity(email: string): Promise<UserActivity> {
    const supabase = await createClient();

    const { count, error: countError } = await supabase
      .from("answer")
      .select("question_id", { count: "exact", head: true })
      .eq("email", email);

    if (countError) throw new Error("총 답변 수 조회 실패");

    const { data, error: dateError } = await supabase
      .from("answer")
      .select("created_at")
      .eq("email", email);

    if (dateError) throw new Error("일별 활동 조회 실패");

    const dateMap: Record<string, number> = {};
    data.forEach((item) => {
      const date = new Date(item.created_at).toISOString().split("T")[0];
      dateMap[date] = (dateMap[date] || 0) + 1;
    });

    const activeDays = Object.keys(dateMap).length;
    const dailyActivity = Object.entries(dateMap).map(([date, count]) => ({ date, count }));

    return new UserActivity(email, count ?? 0, activeDays, dailyActivity);
  }
}
