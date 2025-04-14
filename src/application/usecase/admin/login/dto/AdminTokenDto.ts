export class AdminTokenDto {
    admin_id: number;
    token: string;
  
    constructor(admin_id: number, token: string) {
      this.admin_id = admin_id;
      this.token = token;
    }
  }