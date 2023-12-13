import excuteQuery from "@/lib/db";

export default async function handler(req, res) {
    const { params } = req.query;

    switch (params[0]) {
        case "all":
            const allResult = await excuteQuery({
                query:
                    "SELECT * FROM service"
            });
            res.status(200).json({ data: allResult });

            break;

        case "seveneleven":
            const sevenElevenResult = await excuteQuery({
                query:
                    "SELECT * FROM service INNER JOIN issues on service.IssueID=issues.IssueID WHERE service.`Account Name` LIKE '%7-Eleven%'"
            });
            res.status(200).json({ data: sevenElevenResult });

            break;

        case "ccfi":
            const ccfiResult = await excuteQuery({
                query:
                    "SELECT * FROM service INNER JOIN issues on service.IssueID=issues.IssueID WHERE service.`Account Name` LIKE '%Check into Cash%' OR  service.`Account Name` LIKE '%Community choice financial%' OR  service.`Account Name` LIKE '%Cash & Go%'"
            });

            res.status(200).json({ data: ccfiResult });

            break;

        case "parklandusa":
            const parklandUsaResult = await excuteQuery({
                query:
                    "SELECT * FROM service INNER JOIN issues on service.IssueID=issues.IssueID WHERE service.`Account Name` LIKE '%Parkland%'"
            });
            res.status(200).json({ data: parklandUsaResult });

            break;

        case "southpawabtb":
            const southpawAbtbResult = await excuteQuery({
                query:
                    "SELECT * FROM service INNER JOIN issues on service.IssueID=issues.IssueID WHERE service.`Account Name` LIKE '%ABTB%'"
            });
            res.status(200).json({ data: southpawAbtbResult });

            break;

        case "other":
            const otherResult = await excuteQuery({
                query:
                    "SELECT * FROM service INNER JOIN issues on service.IssueID=issues.IssueID WHERE service.`Account Name` NOT LIKE '%7-Eleven%' AND service.`Account Name` NOT LIKE '%Check into Cash%' AND  service.`Account Name` NOT LIKE '%Community choice financial%' AND  service.`Account Name` NOT LIKE '%Cash & Go%' AND service.`Account Name` NOT LIKE '%Parkland%' AND service.`Account Name` NOT LIKE '%ABTB%'"
            });
            res.status(200).json({ data: otherResult });

            break;

        case "add":
            const query = "INSERT INTO service (Account, `Account Name`, Address, Address2, City, State, ZipCode, `Online Date`, IssueID, Status) VALUES"
            const addResult = await excuteQuery({
                query:
                    `${query} ("${req.body.Account}", "${req.body['Account Name']}", "${req.body.Address}","${req.body.Address2}", "${req.body.City}", "${req.body.State}", "${req.body.ZipCode}", "${req.body['Online Date']}", "${req.body.IssueID}", "${req.body.Status}")`
            });
            res.status(200).json({ data: addResult });

            break;

        case "edit":
            const editResult = await excuteQuery({
                query:
                    `SELECT * FROM service INNER JOIN issues on service.IssueID=issues.IssueID WHERE Account='${params[1]}'`
            });
            res.status(200).json({ locationD: editResult });

            break;

        case "editEntry":
            const editEntryResult = await excuteQuery({
                query:
                    `UPDATE service SET IssueID=${req.body.IssueID}, Status='${req.body.Status}', DateEmailed='${req.body.DateEmailed}', Notes='${req.body.Notes}', CallNumber='${req.body.CallNumber}' WHERE ServiceID=${params[1]}`
            });

            res.status(200).json({ data: editEntryResult });

            break;

        case "delete":
            if (params[1] === "all") {
                switch (params[2]) {
                    case "seveneleven":
                        const delSevenElevenRes = await excuteQuery({
                            query:
                                "DELETE FROM service WHERE `Account Name` LIKE '%7-Eleven%'"
                        });
                        res.status(200).json({ data: delSevenElevenRes });
                        break;
                    case "ccfi":
                        const delCcfiRes = await excuteQuery({
                            query:
                                "DELETE FROM service WHERE `Account Name` LIKE '%Check into Cash%' OR  `Account Name` LIKE '%Community choice financial%' OR  `Account Name` LIKE '%Cash & Go%'"
                        });
                        res.status(200).json({ data: delCcfiRes });
                        break;
                    case "parklandusa":
                        const delParklandRes = await excuteQuery({
                            query:
                                "DELETE FROM service WHERE `Account Name` LIKE '%Parkland%'"
                        });
                        res.status(200).json({ data: delParklandRes });
                        break;
                    case "southpawabtb":
                        const delSouthpawRes = await excuteQuery({
                            query:
                                "DELETE FROM service WHERE `Account Name` LIKE '%ABTB%'"
                        });
                        res.status(200).json({ data: delSouthpawRes });
                        break;
                    case "other":
                        const delOtherRes = await excuteQuery({
                            query:
                                "DELETE FROM service WHERE `Account Name` NOT LIKE '%7-Eleven%' AND `Account Name` NOT LIKE '%Check into Cash%' AND  `Account Name` NOT LIKE '%Community choice financial%' AND  `Account Name` NOT LIKE '%Cash & Go%' AND `Account Name` NOT LIKE '%Parkland%' AND `Account Name` NOT LIKE '%ABTB%'"
                        });
                        res.status(200).json({ data: delOtherRes });
                        break;
                    case "all":
                        const delAllRes = await excuteQuery({
                            query:
                                "DELETE FROM service"
                        });
                        res.status(200).json({ data: delAllRes });
                        break;
                    default:
                        break;
                }
            } else {
                const singleDeleteResult = await excuteQuery({
                    query:
                        `DELETE FROM service WHERE ServiceID=${params[1]}`
                });
                res.status(200).json({ data: singleDeleteResult });
            }

            break;




        default:
            // Nothing matches return error
            res.status(500);
            break;
    }

}
