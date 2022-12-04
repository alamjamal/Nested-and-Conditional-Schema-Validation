const Joi = require('joi')
const options = {errors: {wrap: {label: ''}}  }

const publicValidate = async(body, requestType)=>{
    const addressSchema= {
        pinCode: Joi.string().pattern(/^[1-9]{1}[0-9]{5}/).length(6).required().error(new Error('Provide Correct Pin Number')),
        localAddress: Joi.string().trim().min(5).max(100).required(),
        district: Joi.string().trim().min(2).max(20).required(),
        state: Joi.string().trim().min(2).max(20).required(),
    }

    const schema = Joi.object({
        roles: Joi.string().valid('Educator','Parent','Institute').required(),
        // anything common
        firstName:Joi.string().min(1).max(50).required(),
        lastName:Joi.string(),
        email:Joi.string().email().trim().alter({
                    POST: (schema) => schema.required(),
                    PUT: (schema) => schema.forbidden(),//not required to send payload for update
        }),
        password:Joi.string().min(5).max(25).alter({
                    POST: (schema) => schema.required(),
                    PUT: (schema) => schema.forbidden(),
        }),
        mobile: Joi.string().length(10).pattern(/[6-9]{1}[0-9]{9}/).required()
        .error(new Error('Provide Correct Mobile Number')),

    organisation:  Joi.string().regex(/^[0-9a-fA-F]{24}$/).error(new Error("Invalid Institute"))
                                .when('roles', { is: 'Institute', then: Joi.required() })
                                .when('roles', { is: 'Educator', then: Joi.required() })
                                .when('roles', { is: 'Parent', then: Joi.allow() }),
    
    address:  Joi.object().keys(addressSchema)
                    .when('roles', { is: 'Institute', then: Joi.forbidden() })
                    .when('roles', { is: 'Educator', then: Joi.required() })
                    .when('roles', { is: 'Parent', then: Joi.required() }),
    


    })
      return schema.tailor(requestType).validate(body, options);
}

module.exports={publicValidate}