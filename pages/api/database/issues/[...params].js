import excuteQuery from "@/lib/db";

export default async function handler(req, res) {
    const { params } = req.query;

    switch (params[0]) {
        case "all":
            const allResult = await excuteQuery({
                query:
                    "SELECT * FROM issues"
            });
            res.status(200).json({ data: allResult });

            break;

        case "add":
            const addResult = await excuteQuery({
                query:
                    `INSERT INTO issues (Text, Value) VALUES ("${req.body.text}", "${req.body.value}")`
            });
            res.status(200).json({ data: addResult });

            break;

        default:
            // Nothing matches return error
            res.status(500);
            break;
    }

}