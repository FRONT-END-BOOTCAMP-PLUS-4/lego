import { SubscribeRepository } from "@/domain/repositories/SubscribeRepository";
import { createClient } from "@/utils/supabase/server";

export class SbSubscribeRepository implements SubscribeRepository {
  async subscribe(email: string): Promise<void> {
    const supabase = await createClient();

    const { error } = await supabase.from("subscribe").upsert({ email, is_active: true });
    if (error) throw new Error("구독 실패");
  }

  async unsubscribe(email: string): Promise<void> {
    const supabase = await createClient();

    const { error } = await supabase.from("subscribe").delete().eq("email", email);
    if (error) throw new Error("구독 취소 실패");
  }
}
