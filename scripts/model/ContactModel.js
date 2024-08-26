class ContactModel {
    constructor() {
        this.resetFormData();
    }

    /**
     *
     */
    resetFormData() {
        this.formData = {
            'first-name': '',
            'last-name': '',
            email: '',
            message: ''
        };
    }

    /**
     *
     * @param field
     * @param value
     */
    setFields(field, value) {
        this.formData[field] = value;
    }

    /**
     *
     * @returns {*[]}
     */
    validateFields() {
        const { 'first-name': firstName, 'last-name': lastName, email, message } = this.formData;
        console.log(this.formData);
        const errors = [];

        const nameRegex = /^[a-zA-Zà-ÿÀ-ÿ\- ]{2,30}$/;
        const emailRegex = /^[\w-][\w.-]*[\w-]@[\w-][\w.-]*[\w-].[a-z]{2,10}$/;

        if (!nameRegex.test(firstName)) {
            errors.push({ field: 'first-name', message: "Le prénom doit contenir au moins 2 lettres." });
        }
        if (!nameRegex.test(lastName)) {
            errors.push({ field: 'last-name', message: "Le nom doit contenir au moins 2 lettres." });
        }
        if (!emailRegex.test(email)) {
            errors.push({ field: 'email', message: "L'email n'est pas valide." });
        }
        if (message.trim().length === 0) {
            errors.push({ field: 'message', message: "Le message ne peut pas être vide." });
        }

        return errors;
    }

    /**
     *
     * @returns {*|{message: string, "first-name": string, email: string, "last-name": string}}
     */
    getFormData() {
        return this.formData;
    }
}

export default ContactModel;