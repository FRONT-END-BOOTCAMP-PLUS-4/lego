import { Category } from "@/domain/entities/Category";
import { CategoryRepository } from "@/domain/repositories/CategoryRepository";
import { createClient } from "@/utils/supabase/server";

export class SbCategoryRepository implements CategoryRepository {
  async findAll(): Promise<Category[]> {
    const supabase = await createClient();

    const { data, error } = await supabase.from("category").select("*");


    if (error) {
      console.error("❌ Error fetching categories:", error);
      return [];
    }

    if (!data) {
      console.warn("⚠️ No data returned from category table.");
      return [];
    }

    return data.map((item) => new Category(item.id, item.name, item.image_url));
  }
}
