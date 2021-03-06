import { Field, Float, InputType, ObjectType } from "type-graphql";
import { InputPerson } from "./InputPerson";

@InputType()
export class InputPersonDescriptor {

    @Field((type) => InputPerson, { nullable: true } )
    public person?: InputPerson;

    @Field((type) => [Float], { nullable: true })
    public descriptor?: number[];

}
