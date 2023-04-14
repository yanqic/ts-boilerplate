// 定义一个装饰器工厂，用来创建类装饰器
function Injectable() {
    return function (target: any) {
        // 在类上添加一个静态属性，表示这个类是可注入的
        target.isInjectable = true;
    };
}

function isInjectable(target: any): target is { isInjectable: boolean } {
    return target.isInjectable;
}

// 定义一个容器类，用来管理和创建依赖对象
export class Container {
    // 用一个 Map 来存储类和对应的实例
    private instances = new Map();

    // 根据类来获取实例，如果不存在则创建一个
    get<T>(someClass: { new (...args: any[]): T }): T {
        // 如果这个类不是可注入的，就抛出错误
        if (!isInjectable(someClass)) {
            throw new Error('Cannot inject an uninjectable class');
        }
        // 如果已经有这个类的实例，就直接返回
        if (this.instances.has(someClass)) {
            return this.instances.get(someClass);
        }
        // 否则就创建一个新的实例，并保存到 Map 中
        const instance = new someClass();
        this.instances.set(someClass, instance);
        return instance;
    }
}

// 创建一个全局的容器实例
const container = new Container();

// 定义一个服务类，用 Injectable 装饰器标记它是可注入的
@Injectable()
class UserService {
    constructor() {
        console.log('UserService created');
    }

    getUser() {
        return 'Alice';
    }
}

// 定义一个控制器类，用 Injectable 装饰器标记它是可注入的
@Injectable()
class UserController {
    // 在构造函数中声明需要注入的服务类
    constructor(private userService: UserService) {
        console.log('UserController created');
    }

    getUser() {
        return this.userService.getUser();
    }
}

// 创建一个控制器实例，并从容器中获取需要的服务实例
const userController = new UserController(container.get(UserService));
console.log(userController.getUser()); // Alice
