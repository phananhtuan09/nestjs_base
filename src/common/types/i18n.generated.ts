/* DO NOT EDIT, file generated by nestjs-i18n */
  
/* eslint-disable */
/* prettier-ignore */
import { Path } from "nestjs-i18n";
/* prettier-ignore */
export type I18nTranslations = {
    "common": {
        "error": {
            "default": string;
            "validation_failed": string;
            "unauthorized": string;
            "unauthenticated": string;
            "resource_not_found": string;
            "database_error": string;
        };
    };
    "model": {
        "models": {
            "user": string;
        };
        "columns": {
            "user": {
                "id": string;
                "username": string;
                "email": string;
                "password": string;
                "createdAt": string;
                "updatedAt": string;
            };
        };
    };
    "user": {
        "success": {
            "user_created": string;
            "user_updated": string;
            "user_deleted": string;
            "user_retrieved": string;
        };
        "error": {
            "user_not_created": string;
            "user_not_updated": string;
            "user_not_deleted": string;
            "user_not_retrieved": string;
        };
    };
    "validation": {
        "rules": {
            "isIn": string;
            "isBoolean": string;
            "isDate": string;
            "isString": string;
            "isNumber": string;
            "isInt": string;
            "isArray": string;
            "isEnum": string;
            "min": string;
            "max": string;
            "isEmail": string;
            "IsNotEmpty": string;
            "maxLength": string;
        };
    };
};
/* prettier-ignore */
export type I18nPath = Path<I18nTranslations>;
