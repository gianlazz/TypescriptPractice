import { ArgsType, Field, ID, Int } from "type-graphql";

@ArgsType()
export class CreateGuitarArgs {

    @Field((type) => ID, { nullable: false })
    public userId: string;

    @Field((type) => String, { nullable: false })
    public brand: string;

    @Field((type) => String, { nullable: false })
    public model: string;

    @Field((type) => Int, { nullable: true })
    public year: number;

    @Field((type) => String, { nullable: true })
    public color: string;

}
