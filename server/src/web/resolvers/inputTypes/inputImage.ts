import { Field, ID, InputType } from "type-graphql";
import { InputPerson } from "./InputPerson";

@InputType()
export class InputImage {

    // @Field((type) => ID)
    // public id: number;

    @Field()
    public image: string;

    @Field((type) => [InputPerson])
    public persons: InputPerson[];

}
