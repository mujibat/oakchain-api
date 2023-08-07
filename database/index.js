import mongoose from 'mongoose'

const connect = async access => {
  await mongoose.connect(access, { useNewUrlParser: true, useUnifiedTopology: true })
  console.log('database connected')
}
export default connect
