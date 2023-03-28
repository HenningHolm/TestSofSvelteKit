export function OnlyNum(){
    return function (target: any, propertyKey: string) {   
        let val = target[propertyKey];
        const getter = () => {
            return Number(val);
        }
        const setter = (newVal) => {
            val =  Number(newVal);
        }
        Object.defineProperty(target, propertyKey, {
            get: getter,
            set: setter,
            enumerable: true,
            configurable: true
        });
    }
}

