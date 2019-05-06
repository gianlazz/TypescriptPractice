import { Resolver, Mutation } from "type-graphql";

@Resolver()
export class AuthenticationResolver {

    @Mutation(() => Boolean)
    public async login() {

    }

    @Mutation(() => Boolean)
    public async logout() {

    }

    @Mutation(() => Boolean)
    public async register() {

    }
    
}