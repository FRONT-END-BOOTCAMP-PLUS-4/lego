export interface SubscribeRepository {
  subscribe(email: string): Promise<void>;
  unsubscribe(email: string): Promise<void>;
  isSubscribed(email: string): Promise<boolean>;
}
