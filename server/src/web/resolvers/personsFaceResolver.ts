import { Arg, Float, Int, Mutation, Query, Resolver } from "type-graphql";
import { PersonsFace } from "../../dal/entity/personsFace";

@Resolver()
export class PersonsFaceResolver {

    @Query((type) => [PersonsFace])
    public async recognizedFaces(): Promise<PersonsFace[]> {
        try {
            const results = await PersonsFace.find();
            console.log(results);
            return results;
        } catch (error) {
            console.error(error);
        }
    }

    @Mutation((type) => Int)
    public async registerPersonsFace(
        @Arg("name", { nullable: true }) name?: string,
        @Arg("image", { nullable: true }) image?: string,
        @Arg("descriptor", (type) => [Float], { nullable: true }) descriptor?: number[]
    ): Promise<number> {
        try {
            const inputPersonsFace = { name, image, descriptor };
            console.log("registerPersonsFace mutation hit");
            let personsFace = await PersonsFace.create(inputPersonsFace as PersonsFace);
            personsFace = await personsFace.save();
            console.log(`registerPersonsFace mutation finished ${personsFace.id}`);
            return personsFace.id;
        } catch (error) {
            console.error(error);
        }
    }

}
