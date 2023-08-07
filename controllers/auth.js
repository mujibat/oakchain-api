export const signinUser = (req, res) => {
  try {
    res.json('signin user')
  } catch (err) {
    console.log(err)
  }
}

export const updateUser = (req, res) => {
  try {
    res.json('update user')
  } catch (err) {
    console.log(err)
  }
}

//admin
export const getAllUser = (req, res) => {
  try {
    res.json('Get all user')
  } catch (err) {
    console.log(err)
  }
}

export const getSingleUser = (req, res) => {
  try {
    res.json('Get single user')
  } catch (err) {
    console.log(err)
  }
}
