const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

module.exports = {
  async LoginValidator(req, res, next) {
    const schema = Joi.object()
      .keys({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
      })
      .with("email", "password");

    const { error } = Joi.validate(req.body, schema);
    if (error && error.details) {
      return res.status(400).send(`${error.details[0].message}`);
    } else {
      return next();
    }
  },
  async AdminSignupValidator(req, res, next) {
    const schema = Joi.object()
      .keys({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        last_name: Joi.string().min(3).max(30).required(),
        first_name: Joi.string().min(3).max(30).required(),
        middle_name: Joi.string(),
        gender: Joi.string().required().valid("male", "female"),
        role: Joi.string().valid(
          "superAdmin",
          "subAdmin",
          "admin",
          "storeManager",
          "regionalManager",
          "zonalManager",
          "finance",
          "others"
        ),
        state: Joi.string(),
        lga: Joi.string(),
        address: Joi.string(),
        phone_number: Joi.string(),
        region: Joi.string(),
        zone: Joi.string(),
        organization: Joi.string(),
        phone_number_2: Joi.string(),
      })
      .with("email", "password");

    const { error } = schema.validate(req.body);
    if (error && error.details) {
      return res.status(400).send(`${error.details[0].message}`);
    } else {
      return next();
    }
  },

  async FarmerSignupValidator(req, res, next) {
    const schema = Joi.object()
      .keys({
        email: Joi.string().email().required(),
        last_name: Joi.string().min(3).max(30).required(),
        first_name: Joi.string().min(3).max(30).required(),
        middle_name: Joi.string(),
        age: Joi.string(),
        gender: Joi.string().required(),
        state: Joi.string(),
        lga: Joi.string(),
        village: Joi.string(),
        district: Joi.string(),
        phone_number: Joi.string(),
        bank_name: Joi.string().min(2).max(60),
        // .required(),
        bank_account_name: Joi.string().min(3).max(100),
        // .required(),
        bank_account_number: Joi.string().length(10),
        bvn: Joi.string().length(11),
        lead_farmer_id: Joi.string(),
        group_name: Joi.string(),
        group_number: Joi.number().positive(),
        group_level: Joi.string(),
        avatar_url: Joi.string(),
        role: Joi.string().valid("lead_farmer", "farmer", "secretary"),
      })
      .with("email", "phone_number");

    const { error } = Joi.validate(req.body, schema);
    if (error && error.details) {
      return res.status(400).send(`${error.details[0].message}`);
    } else {
      return next();
    }
  },

  async UserApiTokenValidator(req, res, next) {
    const schema = Joi.object()
      .keys({
        organizationId: Joi.string().required(),
        prefix_initial: Joi.string().required(),
        email: Joi.string().email().required(),
        phone_number: Joi.string().required(),
        valid_until: Joi.string(),
        revoked: Joi.boolean(),
      })
      .with("email", "phone_number");

    const { error } = schema.validate(req.body);
    if (error && error.details) {
      return res.status(400).send(`${error.details[0].message}`);
    } else {
      return next();
    }
  },

  async QuestionaireValidator(req, res, next) {
    const schema = Joi.object().keys({
      organization: Joi.string().required(),
      season: Joi.string().required(),
      questionaireCategory: Joi.string().required(),
      operation_type: Joi.string().required(), // e.g crops, livestock
      category: Joi.string().required(), //e.g crop(maize, rice), livestock(poultry)
      name: Joi.string().required(),
      questions: Joi.object().keys({
        title: Joi.string(),
        options: Joi.array(),
        answer: Joi.array(),
        input_type: Joi.string(),
        compulsory: Joi.boolean(),
      }),
      cut_off_mark: Joi.number(),
      score_per_question: Joi.number(),
      status: Joi.string(),
    });

    const { error } = schema.validate(req.body);
    if (error && error.details) {
      return res.status(400).send(`${error.details[0].message}`);
    } else {
      return next();
    }
  },

  async QuestionaireUpdateValidator(req, res, next) {
    const schema = Joi.object().keys({
      organization: Joi.string().required(),
      season: Joi.string().required(),
      questionaireCategory: Joi.string().required(),
      operation_type: Joi.string().required(), // e.g crops, livestock
      category: Joi.string().required(), //e.g crop(maize, rice), livestock(poultry)
      name: Joi.string().required(),
      questions: Joi.array().items(
        Joi.object()
          .keys({
            title: Joi.string(),
            options: Joi.array(),
            answer: Joi.array(),
            input_type: Joi.string(),
            compulsory: Joi.boolean(),
          })
          .required()
      ),
      cut_off_mark: Joi.number(),
      score_per_question: Joi.number(),
      status: Joi.string(),
    });

    const { error } = schema.validate(req.body);
    if (error && error.details) {
      return res.status(400).send(`${error.details[0].message}`);
    } else {
      return next();
    }
  },

  async QuestionaireCategoryValidator(req, res, next) {
    const schema = Joi.object().keys({
      user: Joi.string().required(),
      operation_type: Joi.string().required(), // e.g crops, livestock
      category: Joi.string().required(), //e.g crop(maize, rice), livestock(poultry)
      name: Joi.string().required(),
      model: Joi.string().required(),
      tag: Joi.string().required(),
      status: Joi.string(),
    });

    const { error } = schema.validate(req.body);
    if (error && error.details) {
      return res.status(400).send(`${error.details[0].message}`);
    } else {
      return next();
    }
  },

  async QuestionaireAddQuestionValidator(req, res, next) {
    const schema = Joi.object().keys({
      title: Joi.string(),
      options: Joi.array(),
      answer: Joi.array(),
      input_type: Joi.string(),
      compulsory: Joi.boolean(),
    });

    const { error } = schema.validate(req.body);
    if (error && error.details) {
      return res.status(400).send(`${error.details[0].message}`);
    } else {
      return next();
    }
  },

  async QuestionaireAddManyQuestionValidator(req, res, next) {
    const schema = Joi.array().items(
      Joi.object()
        .keys({
          title: Joi.string(),
          options: Joi.array(),
          answer: Joi.array(),
          input_type: Joi.string(),
          compulsory: Joi.boolean(),
        })
        .required()
    );

    const { error } = schema.validate(req.body);
    if (error && error.details) {
      return res.status(400).send(`${error.details[0].message}`);
    } else {
      return next();
    }
  },

  async OrganizationValidator(req, res, next) {
    const schema = Joi.object()
      .keys({
        prefix_initial: Joi.string().required(),
        email: Joi.string().email().required(),
        phone_number: Joi.string(),
        valid_until: Joi.date(),
        revoked: Joi.boolean(),
        name: Joi.string().required(),
        subdomain: Joi.string(),
        superAdmin: {
          first_name: Joi.string().required(),
          last_name: Joi.string().required(),
          email: Joi.string().required(),
          password: Joi.string().required(),
          phone_number: Joi.string().required(),
          gender: Joi.string().required(),
        },
      })
      .with("email", "phone_number");

    const { error } = schema.validate(req.body);
    if (error && error.details) {
      return res.status(400).send(`${error.details[0].message}`);
    } else {
      return next();
    }
  },

  async OrgCounterValidator(req, res, next) {
    const schema = Joi.object().keys({
      sequence_key: Joi.string().required(),
      sequence_value: Joi.number().required(),
      organization: Joi.string().required(),
    });

    const { error } = schema.validate(req.body);
    if (error && error.details) {
      return res.status(400).send(`${error.details[0].message}`);
    } else {
      return next();
    }
  },

  async PayrollValidator(req, res, next) {
    const schema = Joi.object().keys({
      name: Joi.string().required(),
      user: Joi.string().required(),
      organization: Joi.string().required(),
    });

    const { error } = schema.validate(req.body);
    if (error && error.details) {
      return res.status(400).send(`${error.details[0].message}`);
    } else {
      return next();
    }
  },

  async AdminUpdateValidator(req, res, next) {
    const schema = Joi.object().keys({
      email: Joi.string().email(),
      last_name: Joi.string().min(3).max(30),
      first_name: Joi.string().min(3).max(30),
      middle_name: Joi.string(),
      gender: Joi.string(),
      role: Joi.string(),
      region: Joi.string(),
      zone: Joi.string(),
      state: Joi.string(),
      lga: Joi.string(),
      phone_number: Joi.string(),
      phone_number_2: Joi.string(),
      organization: Joi.string(),
      address: Joi.string(),
    });

    const { error } = schema.validate(req.body);
    if (error && error.details) {
      return res.status(400).send(`${error.details[0].message}`);
    } else {
      return next();
    }
  },
  async VerifyToken(req, res, next) {
    const schema = Joi.object().keys({
      token: Joi.string().min(3).required(),
    });

    const { error } = Joi.validate(req.body, schema);
    if (error && error.details) {
      return res.status(400).send(`${error.details[0].message}`);
    } else {
      return next();
    }
  },
  async ForgotPassword(req, res, next) {
    const schema = Joi.object().keys({
      email: Joi.string().email().required(),
    });

    const { error } = Joi.validate(req.body, schema);
    if (error && error.details) {
      return res.status(400).send(`${error.details[0].message}`);
    } else {
      return next();
    }
  },
  async ResetPassword(req, res, next) {
    const schema = Joi.object()
      .keys({
        token: Joi.string().min(3).required(),
        newPassword: Joi.string().min(6).required(),
      })
      .with("token", "newPassword");

    const { error } = Joi.validate(req.body, schema);
    if (error && error.details) {
      return res.status(400).send(`${error.details[0].message}`);
    } else {
      return next();
    }
  },
  async ChangePassword(req, res, next) {
    const schema = Joi.object()
      .keys({
        oldPassword: Joi.string() // remove for old users
          .min(6)
          .required(),
        newPassword: Joi.string().min(6).required(),
      })
      .with("oldPassword", "newPassword");

    const { error } = Joi.validate(req.body, schema);
    if (error && error.details) {
      return res.status(400).send(`${error.details[0].message}`);
    } else {
      return next();
    }
  },
  async CheckEmail(req, res, next) {
    const schema = Joi.object().keys({
      email: Joi.string().email().required(),
    });

    const { error } = Joi.validate(req.body, schema);
    if (error && error.details) {
      return res.status(400).send(`${error.details[0].message}`);
    } else {
      return next();
    }
  },
};
