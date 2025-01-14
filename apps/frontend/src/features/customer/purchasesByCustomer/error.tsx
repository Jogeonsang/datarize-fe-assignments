import styled from '@emotion/styled'

function PurchasesByCustomerError({ reset }: { reset: () => void }) {
  return (
    <Container>
      <p>정보를 불러오다가 실패했어요 😢</p>
      <Button onClick={() => reset()}>다시 시도하기</Button>
    </Container>
  )
}

export default PurchasesByCustomerError

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 24px;
`

const Button = styled.button`
  background-color: #000;
  color: #fff;
  padding: 10px 20px;
  border-radius: 5px;
`
