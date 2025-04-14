import { createClient } from "@/utils/supabase/server";
import { AdminRepository } from "@/domain/repositories/AdminRepository";
import { Admin } from "@/domain/enities/Admin";

export class SbAdminRepository implements AdminRepository {
  // 이름과 비밀번호로 관리자 찾기
  async findByCredentials(name: string, password: string): Promise<Admin | null> {
    const supabase = await createClient();

    // Supabase에서 이름과 비밀번호로 관리자 검색
    const { data, error } = await supabase
      .from("admin") // "admin" 테이블 사용
      .select("id, name, password") // 필요한 필드만 선택
      .eq("name", name) // name 필드가 일치하는 행 검색
      .eq("password", password) // password 필드가 일치하는 행 검색
      .single(); // 단일 결과 반환

    if (error) {
      console.error("관리자 검색 실패:", error.message);
      return null;
    }

    if (data) {
      // Admin 객체 생성 후 반환
      return new Admin(data.name, data.password);
    }

    return null; // 검색 결과가 없을 경우 null 반환
  }
}