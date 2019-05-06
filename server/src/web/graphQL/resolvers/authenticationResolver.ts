import { Resolver, Mutation, Authorized, Arg } from "type-graphql";
import * as bcrypt from "bcryptjs";
import { User } from "../../../dal/entity/user";
import { RegisterInput } from "./inputTypes/inputUser";

@Resolver()
export class AuthenticationResolver {

    @Mutation(() => Boolean)
    public async login() {

    }

    @Authorized()
    @Mutation(() => Boolean)
    public async logout() {

    }

    @Mutation(() => Boolean)
    public async register(
        @Arg("data") { username, email, password }: RegisterInput
        ): Promise<Boolean> {
        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await User.create({
            username,
            email,
            password: hashedPassword
        }).save();

        return true
    }

    @Mutation(() => Boolean)
    public async registerWithInvite(): Promise<Boolean> {

        return false;
    }

    @Mutation(() => Boolean)
    public async sendInvite() {
        
    }

}