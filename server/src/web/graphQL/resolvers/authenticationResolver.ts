import { Resolver, Mutation, Authorized } from "type-graphql";

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
    public async registerWithInvite() {

    }

    @Mutation(() => Boolean)
    public async sendInvite() {
        
    }

}