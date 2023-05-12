import mongoose from 'mongoose';

type UserInfo = {
    username: string,
    email: string,
    authentication?: {
        password?:string
        salt?:string
        sessionToken?:string
    }
}

const UserScheam = new mongoose.Schema({
    username: {type: String, required: true},
    email: {type: String, required: true},
    authentication: {
        password: {type: String, required: true,select: false},
        salt: {type: String, select: false},
        sessionToken: {type: String, select: false}
    }
})

export const UserModel = mongoose.model('User', UserScheam);

export const getUsers = () => UserModel.find();

export const getUserByEmail = (email: string) => UserModel.findOne({email});

export const getUserBySessionToken = (sessionToken: string) => UserModel.findOne({'authentication.sessionToken': sessionToken});

export const getUserById = (id: string) => UserModel.findById(id);

export const createUser = (values: UserInfo) => new UserModel(values).save().then((user) => user.toObject());

export const deleteUserById = (id: string) => UserModel.findOneAndDelete({_id: id});

export const updateUserById = (id: string, values: UserInfo) => UserModel.findByIdAndUpdate(id, values); 

