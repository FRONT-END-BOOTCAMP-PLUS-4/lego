import { Social } from "../enities/Social";

export interface SocialRepository {
    findById(id: number): Promise<Social>;
    findAll(social: Social): Promise<Social[]>;
}