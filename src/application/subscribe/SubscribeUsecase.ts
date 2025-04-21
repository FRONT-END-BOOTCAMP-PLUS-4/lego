import { SubscribeRepository } from "@/domain/repositories/SubscribeRepository";

export class SubscribeUsecase {
  constructor(private readonly repo: SubscribeRepository) {}

  async subscribe(email: string) {
    await this.repo.subscribe(email);
  }

  async unsubscribe(email: string) {
    await this.repo.unsubscribe(email);
  }

  async isSubscribed(email: string): Promise<boolean> {
    return this.repo.isSubscribed(email);
  }
}
