import { Resolver, Mutation, Authorized, Arg } from "type-graphql";
import * as bcrypt from "bcryptjs";
import { User } from "../../../dal/entity/user";

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
    public async registerWithInvite(
        @Arg('username') username: string,
        @Arg('email') email: string,
        @Arg('password') password: string
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
    public async sendInvite() {
        
    }

}