import { InputType, Field } from "type-graphql";
import { Length, IsEmail } from "class-validator";

@InputType()
export class RegisterInput {

    @Field()
    @Length(1, 255)
    public username: string;

    @Field()
    @IsEmail()
    public email: string;

    @Field()
    public password: string;

}