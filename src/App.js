import { Layout } from './components/hoc/Layout/Layout'
import TimerHooks from './components/Timer_withHooks/Timer_withHooks'


export default function App() {
  return (
    <Layout>
      <TimerHooks />
    </Layout>
  )
}



// Здравствуйте, код-ревьюер!
// После получения тестового задания позавчера(27.07.21) сперва я реализовал приложение,
// используя statefull react class(исходники в папке containers), 
// поскольку c этим функционалом до сегодняшнего дня работал намного чаще,
// но после дня изучения хуков и rxjs я решил реализовать приложение с помощью Хуков(папка components),
// куда и подключил rxjs