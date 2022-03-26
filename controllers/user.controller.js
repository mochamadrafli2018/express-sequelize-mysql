const User = require("../config/sequelize.connect").User;
const bcrypt = require('bcrypt');

exports.newUser = (req, res) => {
  // validate request
  if (!req.body) { return res.status(400).send({ message:"Content can not be empty!" }); }
  if (!req.body.name) { return res.status(400).send({ message:"Name can not be empty!" });}
  if (!req.body.email) { return res.status(400).send({ message:"Email can not be empty!" });}
  if (!req.body.password) { return res.status(400).send({ message:"Password can not be empty!" });}
  if (!req.body.gender) { return res.status(400).send({ message:"Gender can not be empty!" });}
  if (!req.body.role) { return res.status(400).send({ message:"Role can not be empty!" });}
  // convert password to hashed
  const encryptedPassword = bcrypt.hashSync(req.body.password, 10);
  const newUser = {
    name: req.body.name,
    email: req.body.email,
    password: encryptedPassword,
    gender: req.body.gender,
    role: req.body.role,
    updatedSkriningResult: "",
  };
  console.log(newUser); 
  // save new user in the database
  User.create(newUser)
  .then(data => { return res.status(200).send(data); })
  .catch(error => { return res.status(500).send({ message: error.message || "Some error occurred while creating the user."}); });
};

exports.findAll = (req, res) => {
  User.findAll()
  .then(data => { return res.status(200).send(data);})
  .catch(error => {
    res.status(500).send({message:error.message || "Some error occurred while retrieving tutorials."});
  });
};

exports.findOne = (req, res) => {
  console.log(req.params)
  User.findOne({
    where: {
      id: req.params.id
    }
  })
  .then(data => { return res.status(200).send(data);})
  .catch(error => {
    if (error.kind === "not_found") {
      return res.status(404).send({message: `Not found user with id ${req.params.userId}.`});
    } 
    else {
      return res.status(500).send({message: "Error retrieving user with id " + req.params.userId});
    }
  });
};

exports.findOneAndUpdate = (req, res) => {
  console.log(req.body);
  User.findOne({
    where: {
      id: req.params.id
    }
  })
  .then(currentData => {
    console.log(currentData);
    if(!currentData) {
      return res.status(404).send({ message: 'data not found with id ' + req.params.id + '. Make sure the id was correct' });
    }
    if (!req.body.name) { newName = currentData.name}
    if (!req.body.email) { newEmail = currentData.email}
    if (!req.body.password) { newPassword = currentData.password}
    if (!req.body.gender) { newGender = currentData.gender}
    if (!req.body.role) { newRole = currentData.role}
    if (!req.body.updatedScreeningResult) { newUpdatedScreeningResult = currentData.updatedScreeningResult}
    if (req.body.name) { newName = req.body.name}
    if (req.body.email) { newEmail = req.body.email}
    if (req.body.password) { newPassword = req.body.password}
    if (req.body.gender) { newGender = req.body.gender}
    if (req.body.role) { newRole = req.body.role}
    if (req.body.updatedScreeningResult) { newUpdatedScreeningResult = req.body.updatedScreeningResult}
    const newUpdatedData =
    {
      name: newName,
      email: newEmail,
      password: newPassword,
      gender: newGender,
      role: newRole,
      updatedScreeningResult: newUpdatedScreeningResult,
    }
    console.log(newUpdatedData);
    // update
    User.update(
      newUpdateData,
      {
        where: {
          id: req.params.id
        }
      }
    )
    .then(updatedData => { return res.status(200).send(updatedData);})
    .catch(error => {
      if (error.kind === "not_found") {
        return res.status(404).send({message: `User with id ${req.params.userId} not found.`});
      } 
      else {
        return res.status(500).send({message: "Error updating User with id " + req.params.userId});
      }
    });
  })
  .catch(error => {
    if (error.kind === "not_found") {
      return res.status(404).send({message: `Not found user with id ${req.params.userId}.`});
    } 
    else {
      return res.status(500).send({message: "Error retrieving user with id " + req.params.userId});
    }
  });
};

exports.destroyById = (req, res) => {
  User.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(() => { return res.status(200).send({message: `User was deleted successfully!`});})
  .catch(error => {
    if (error) {
      if (error.kind === "not_found") {
        return res.status(404).send({message: `Not found user with id ${req.params.userId}.`});
      } 
      else {
        return res.status(500).send({message: "Could not delete user with id " + req.params.userId});
      }
    } 
  });
};
  
exports.destroyAll = (req, res) => {
  User.destroy()
  .then(data => { return res.status(200).send({message: `All user were deleted successfully!` });})
  .catch(error => {
    return res.status(500).send({message: error.message || "Some error occurred while removing all user."});
  });
};