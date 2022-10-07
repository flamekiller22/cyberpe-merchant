import styles from './addFunds.module.scss'

export default function AddFunds({ email }) {

  const addAmount = async (e) => {
    e.preventDefault()
    document.querySelector('.loading#loading').style.visibility = 'visible'

    const amount = document.querySelector(`.${styles.addFundsInput}`).value 
    if (isNaN(amount) && amount !== '1e10000') {
      document.querySelector(`.${styles.error}`).style.visibility = 'visible'
      return false
    }
    document.querySelector(`.${styles.error}`).style.visibility = 'hidden'

    const res = await fetch(`http://localhost:3001/api/createTransaction?amount=${amount}`)
    const json = await res.json()

    if (json.trn_create_status) {
      const trn_id = json.trn_id
      const interval = setInterval(async () => {
        const resp = await fetch(`http://localhost:3001/api/trnStatus?id=${trn_id}`).then(res => res.json())
        if (resp.reg_no !== null && resp.status === false) {
          document.querySelector('.loading#loading').style.visibility = 'hidden'
          clearInterval(interval)
          alert(`Failed: Insufficient Balance`)
        }
        if (resp.status) {
          document.querySelector('.loading#loading').style.visibility = 'hidden'
          alert(`Paid by ${resp.reg_no}`)
          clearInterval(interval)
          window.location.reload()
        }
      }, 1000)
    }
    else {
      alert('Failed')
    }
  }

  return (
    <div className={styles.addFunds}>
        <div className={styles.addFundsContainer}>
            <div className={styles.heading}>
                <h3>Create Transaction</h3>
            </div>
            <div className={styles.body}>
                <div className={styles.miniContainer}>
                <input id='amountinput' className={styles.addFundsInput} type='numbers' placeholder='100'/>
                <p style={{ visibility: 'hidden' }} className={styles.error}>Incorrect Input</p>
                </div>
                <button className={styles.button} onClick={addAmount}>Create</button>
                <h5>Reload page for updates</h5>
            </div>
        </div>
    </div>
  )
}
