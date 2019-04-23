import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Guitar } from "../../dal/entity/guitar";

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
    public async createGuitar(guitar: Guitar): Promise<Guitar> {
        try {
            guitar = await Guitar.create(guitar);
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
