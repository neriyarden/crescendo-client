import * as Yup from 'yup';

const PASSWORD_MSG = 'Password must contain a number, a special character, and a letter, and 8-20 characters'
const NAME_MSG = 'Name may contain Letters, Numbers & Special charachters'

// Schemas configurations
const id = Yup.object().shape({
    id: Yup.number().positive().integer(),
    user_id: Yup.number().positive().integer(),
    artist_id: Yup.number().positive().integer(),
    city_id: Yup.number().positive().integer(),
    event_id: Yup.number().positive().integer(),
    request_id: Yup.number().positive().integer(),
})

const signIn = Yup.object({
    email: Yup.string().email('Invalid email address').required('Required field'),
    password: Yup.string()
        .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/, PASSWORD_MSG)
        .required('Required field'),
})

const signUp = Yup.object({
    name: Yup.string().min(2, 'Too Short').max(15, 'Too Long')
        .matches(/^\w+(?:\s\w+)*$/, NAME_MSG)
        .required('Required field'),
    email: Yup.string().email('Invalid email address').required('Required field'),
    password: Yup.string()
        .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/, PASSWORD_MSG)
        .required('Required field'),
    repeat_password: Yup.mixed().oneOf([Yup.ref('password')], 'The 2 passwords don\'t Match').required('Required'),
    is_artist: Yup.number().min(0, 'asd').max(1, 'sdf')
})

const account = Yup.object({
    name: Yup.string().min(2, 'Too Short').max(15, 'Too Long')
        .matches(/^\w+(?:\s\w+)*$/, NAME_MSG)
        .required('Required field'),
    password: Yup.string()
        .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/, PASSWORD_MSG)
        .required('Required field'),
    repeat_password: Yup.mixed().oneOf([Yup.ref('password')], 'The 2 passwords don\'t Match').required('Required'),
})

const profile = Yup.object({
    bio: Yup.string().max(1000, 'Only 1000 characters are allowed'),
    link_to_spotify: Yup.string().max(255, 'Too Long').matches(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)/, 'Please enter a valid URL').nullable(true),
    link_to_instagram: Yup.string().max(255, 'Too Long').matches(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)/, 'Please enter a valid URL').nullable(true),
    link_to_facebook: Yup.string().max(255, 'Too Long').matches(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)/, 'Please enter a valid URL').nullable(true),
    link_to_youtube: Yup.string().max(255, 'Too Long').matches(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)/, 'Please enter a valid URL').nullable(true),
})

const event = Yup.object({
    tour: Yup.string().max(50).nullable(true),
    date: Yup.date()
        .min(new Date(Date.now() -86400000), 'Date field cannot be in the past.').required(),
    time: Yup.string().matches(/^(?:2[0-3]|[01][0-9]):[0-5][0-9]$/, 'Wrong ime format'),
    duration: Yup.number().positive().integer().max(20160),
    venueName: Yup.string().max(50).required('Venue is required'),
    city: Yup.string().max(50),
    description: Yup.string().max(1000),
    ticketseller_url: Yup.string().max(500).required('Ticket Seller URL is required'),
})

const request = Yup.object({
    tour: Yup.string().max(50).nullable(true),
    city: Yup.string().max(50),
    cap: Yup.number().positive().integer().max(100_000),

})


const validations =  {
    id,
    profile,
    signIn,
    signUp,
    account,
    event,
    request
}
export default validations