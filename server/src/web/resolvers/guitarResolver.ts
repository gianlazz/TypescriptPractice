import { Arg, Args, ArgsType, Field, ID, Int, Mutation, Query, Resolver } from "type-graphql";
import { Guitar } from "../../dal/entity/guitar";
import { CreateGuitarArgs } from "./createGuitarArgs";

@Resolver()
export class GuitarResolver {

    @Query((returns) => [Guitar])
    public async guitars(): Promise<Guitar[]> {
        // guitars: async (userId: string) => {
        try {
            //  const guitars = await Guitar.find({ userId });
            const guitars = await Guitar.find();
            console.log(guitars);
            return guitars;
        } catch (error) {
            console.error(error);
        }
    }

    @Mutation((type) => Guitar)
    public async createGuitar(@Args() guitarInput: CreateGuitarArgs): Promise<Guitar> {
        try {
            let guitar = await Guitar.create(guitarInput as Guitar);
            guitar = await guitar.save();
            return guitar;
        } catch (error) {
            console.error(error);
        }
    }

    @Mutation((type) => Boolean)
    public async deleteGuitar( @Arg("id", { nullable: false })id: number ): Promise<boolean> {
        try {
            Guitar.delete(id);
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

}
