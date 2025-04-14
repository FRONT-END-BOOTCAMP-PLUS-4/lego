import { supabase } from "@/utils/supabase/server";
import { AdminRepository } from "@/domain/repositories/AdminRepository";
import { Admin } from "@/domain/enities/Admin";

export class SbAdminRepository implements AdminRepository {
  // 이름과 비밀번호로 관리자 찾기
  async findByCredentials(name: string, clientPasswordHash: string): Promise<Admin | null> {
    // Supabase에서 이름으로 관리자 검색
    const { data, error } = await supabase
      .from("admin") // "admin" 테이블 사용
      .select("id, name, password") // 필요한 필드만 선택
      .eq("name", name) // name 필드가 일치하는 행 검색
      .single(); // 단일 결과 반환

    if (error) {
      console.error("관리자 검색 실패:", error.message);
      return null;
    }

    if (data) {
      // 데이터베이스에 저장된 비밀번호를 SHA-512로 해시화
      const encoder = new TextEncoder();
      const encodedPassword = encoder.encode(data.password);
      const hashBuffer = await crypto.subtle.digest("SHA-512", encodedPassword);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const dbPasswordHash = hashArray.map((byte) => byte.toString(16).padStart(2, "0")).join("");

      // 클라이언트에서 받은 비밀번호 해시와 비교
      if (dbPasswordHash === clientPasswordHash) {
        // 비밀번호가 일치하면 Admin 객체 반환
        return new Admin(data.id, data.password);
      } else {
        console.error("비밀번호가 일치하지 않습니다.");
        return null;
      }
    }

    return null; // 검색 결과가 없을 경우 null 반환
  }
}