import { UserRepository } from "@/core/user/repository";
import { Prisma, User } from "@prisma/client";
import { randomUUID } from "crypto";

enum Rule {
  MEMBER = "MEMBER",
  ADMIN = "ADMIN",
}

export class InMemoryUserRepository implements UserRepository {
  public items: User[] = [];
  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password: data.password,
      created_at: new Date(),
      rule: data.rule ?? Rule.MEMBER,
    };

    this.items.push(user);

    return user;
  }
  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email);

    if (!user) {
      return null;
    }

    return user;
  }
  async findById(id: string) {
    const user = this.items.find((item) => item.id === id);

    if (!user) {
      return null;
    }

    return user;
  }
}
