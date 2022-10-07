export default async function handler(req, res) {
    try {
        const id = req.query.id
        const resp = await fetch(`http://127.0.0.1:5001/transaction-status?trn_id=${id}`).then(res => res.json())
        res.json(resp)
    } catch (err) {
        res.json({status: false})
    }
}