import auditLog from "../model/auditLog.model.js";

const auditLoger = async ({
    action,
    performedBy,
    module,
    targetedId,
    Ip,
    userAgent,
}) => {
    try {

        const audit = await auditLog.create({
            action,
            performedBy,
            module,
            targetedId,
            Ip,
            userAgent,
        })

    } catch (error) {
        console.log("error", error)

    }
}


export default auditLoger