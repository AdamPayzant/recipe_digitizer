/*
This is just a sample of what recipe data looks like
*/

export const sample = {
    _id: ObjectId("0"),
    name: "Grilled Cheese",
    description: "It's a grilled cheese, what more do you want",
    ingredients: {
        "bread": "2 slices",
        "butter": "enough to coat bread",
        "Cheese Slice": "1"
    },
    instructions: {
        // Allows you to have mutliple segments inside a greater recipe
        main:[
            "Heat pan at medium heat on stovetop",
            "Butter 1 side of each bread slice",
            "Place one slice on pan, butter side down",
            "Place cheese slice on top of bread",
            "Place second bread slice on top of cheese, butter side up",
            "Wait until cheese has started melting, then flip",
            "Wait until opposite side has toasted to prefered level, then serve"
        ]
    },
}