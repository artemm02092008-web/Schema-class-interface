export class User {
  constructor(
    public userId: number,
    public login: string,
    public passwordHash: string,
    public role: string
  ) {}

  public authorize(): boolean {
    console.log(`[User] Авторизация пользователя ${this.login}...`);
    return true;
  }

  public getRole(): string {
    return this.role;
  }
}
