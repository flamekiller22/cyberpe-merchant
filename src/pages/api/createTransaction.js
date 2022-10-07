import { getToken } from "next-auth/jwt"

export default async function handler(req, res) {
  const token = await getToken({ req, secret: process.env.SECRET })
  if (!token) {
    res.json({status: false})
  } else {
    try {
      const email = token.email
      const amount = req.query.amount
      const resp = await fetch(`http://127.0.0.1:5001/new-transaction?email=${email}&amount=${amount}&trn_type=Payment`).then(res => res.json())
      res.json(resp)
    } catch (err) {
      res.json({status: false})
    }
  }
}