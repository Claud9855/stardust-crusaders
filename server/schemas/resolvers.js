const {User} = require('../models');
const {signToken} = require('../utils/auth');
const {AuthenticationError} = require('apollo-server-express');
const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if(context.user) {
                const userData = await User.findOne({_id: context.user._id}).select('-__v -password');
                return userData;
            }
            return new AuthenticationError('You are not logged in, please log in to continue!');
        }
    },
    Mutation: {
        addUser: async (parent, args) => {
            try {
                const user = await User.create(args);
                const token = signToken(user);
                return {token, user};
            }
            catch(err) {
                console.log(err);
            }
        },
        login: async (parent, {email, password}) => {
            const user = await User.findOne({email});
            if(!user) {
                throw new AuthenticationError('Try again!');
            }
            const correctPassword = await user.isCorrectPassword(password);
            if(!correctPassword) {
                throw new AuthenticationError('Try again!');
            }
            const token = signToken(user);
            return {token, user};
        },
        saveGame: async (parent, args, context) => {
            if(context.user) {
                const updatedUser = await User.findByIdAndUpdate(
                    {_id: context.user._id},
                    {$addToSet: {savedGames: args.input}},
                    {new: true}
                );
                return updatedUser;
            }
            throw new AuthenticationError('You are not logged in, please log in to continue!');
        },
        removeGame: async (parent, args, context) => {
            if(context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    {_id: context.user._id},
                    {$pull: {savedGames: {gameId: args.gameId}}},
                    {new: true}
                );
                return updatedUser;
            }
            throw new AuthenticationError('You are not logged in, please log in to continue!');
        }
    }
};
module.exports = resolvers;