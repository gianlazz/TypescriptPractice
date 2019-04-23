import { Resolver, Query } from "type-graphql";
import { Guitar } from "../../dal/entity/guitar";


@Resolver()
export class GuitarResolver {

    @Query((returns) => String)
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

}