export default function handler(
    req,
    res
  ) {
    let data = []
    for (let i=0; i<100; i++){
        data.push(i)
    }
    res.status(200).json(data)
  }