import { Injectable } from '@nestjs/common';

@Injectable()
export class UserDataService {
  private profiles = new Map<number, UserData>();

  public isOnline(id: number) {
    const profile = this.profiles.get(id);
    return Boolean(profile) && profile.is_online;
  }

  public setOnline(id: number, status: boolean = true) {
    if (!this.hasProfile(id)) {
      this.createProfile(id, { is_online: status });
    } else {
      this.getProfile(id).is_online = status;
    }
  }

  public hasProfile(id: number) {
    return this.profiles.has(id);
  }

  public getProfile(id: number) {
    return this.profiles.get(id);
  }

  public createProfile(id: number, data?: Partial<UserData>) {
    this.profiles.set(id, Object.assign({ is_online: false }, data));
  }

  public deleteProfile(id: number) {
    this.profiles.delete(id);
  }
}

interface UserData {
  is_online: boolean;
}
