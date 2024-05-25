import { FunctionComponent, useContext, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import {
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
  AiOutlineHome
} from 'react-icons/ai'

//components
import Header from '../../components/header/header.component'
import CustomButton from '../../components/custom-button/custom-button.component'

//styles
import {
  PaymentConfirmationContainer,
  PaymentConfirmationContent
} from './payment-confirmation.styles'

//utilities
import Colors from '../../theme/theme.colors'
import { CartContext } from '../../contexts/cart.context'

const PaymentConfirmationPage: FunctionComponent = () => {
  const { clearProducts } = useContext(CartContext)
  const [searchParams] = useSearchParams()

  const navigate = useNavigate()

  const status = searchParams.get('success')
  const isCanceled = searchParams.get('canceled') === 'true'

  useEffect(() => {
    if (status === 'true') {
    }
  }, [status])

  const handleGoToHomePageClick = () => {
    navigate('/')
    clearProducts()
  }

  return (
    <>
      <Header />
      <PaymentConfirmationContainer>
        <PaymentConfirmationContent>
          {status == 'true' && (
            <>
              <AiOutlineCheckCircle size={120} color={Colors.success} />
              <p>Sua compra foi finalizada com sucesso!</p>
            </>
          )}

          {(status == 'false' || isCanceled) && (
            <>
              <AiOutlineCloseCircle size={120} color={Colors.error} />
              <p>
                Ocorreu um erro ao finalizar sua compra. Por favor, tente
                novamente
              </p>
            </>
          )}

          <CustomButton
            startIcon={<AiOutlineHome />}
            onClick={handleGoToHomePageClick}
          >
            Ir para a Página Inicial
          </CustomButton>
        </PaymentConfirmationContent>
      </PaymentConfirmationContainer>
    </>
  )
}

export default PaymentConfirmationPage
