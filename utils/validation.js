const ValidateUser = (user) => {
    let errors = [];
    let valid = true;


    if (!user.firstName){
        valid = false;
        errors.push({field: 'firstName', message: 'First name is required'});

    }

    if(!user.lastName){
        valid = false;
        errors.push({field:'lastName', message:'Last name is required'});
    }

    if (!user.email){
        valid = false;
        errors.push({field: 'email', message:'Email is required'});
    }

    if(!user.Phone) {
        valid = false;
        errors.push({field:'Phone', message:'Phone is required'});

    }

    if (!user.password){
        valid=false;
        errors.push({field:'password',message:'password is required'});
    }

    return {errors,valid};

};