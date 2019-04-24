import { Field, ID, InputType } from "type-graphql";
import { InputImage } from "./inputImage";

@InputType()
export class InputPerson {

    // @Field((type) => ID)
    // public id: number;

    @Field()
    public name: string;

    @Field()
    public firstSeenDateTime: string;

    @Field((type) => [InputImage])
    public images: InputImage[];

}
