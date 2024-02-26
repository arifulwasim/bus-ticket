function getConvertedValue(elementId) {
    const element = document.getElementById(elementId).innerText;
    const convertElement = parseInt(element)
    return convertElement
}


const allSeat = document.getElementsByClassName('allSeat')

for (const seat of allSeat) {
    seat.addEventListener('click', function (e) {

        const totalSeatLimit = getConvertedValue("totalSeat")
        if (totalSeatLimit + 1 > 4) {
            alert("Limit Over!")
            return
        }
        seat.setAttribute("disabled", false)
        seat.style.backgroundColor = "green"
        seat.style.color = "white"


        const leftSeat = getConvertedValue("seatLeft")
        const seatLeft = document.getElementById('seatLeft').innerText = leftSeat - 1

        const totalSeat = getConvertedValue("totalSeat")
        const sectTotal = document.getElementById('totalSeat').innerText = totalSeat + 1


        const passengersInfo = document.getElementById('passengers-info')
        const div = document.createElement('div')
        div.innerHTML =
            `
        <div class="overflow-x-auto">
  <table class="table">
    <tbody>
      <tr class="hover">
        <td> ${seat.innerText} </td>
        <td> economy </td>
        <td> 550 </td>
      </tr>
    </tbody>
  </table>
</div>
        `
        passengersInfo.appendChild(div)

        updateTotalPrice(550)
        updateGrandTotal()

    })
}


function updateTotalPrice(value) {
    // console.log(value);
    const updatePrice = getConvertedValue('total-price');
    const sum = updatePrice + value

    document.getElementById('total-price').innerText = sum
    if (sum > 1) {
        document.getElementById('nextBtn').removeAttribute('disabled', true)
    }
}

function updateGrandTotal(status) {
    // console.log(status);
    const updatePrice = getConvertedValue('total-price');
    if (status == undefined) {
        document.getElementById('grand-total').innerText = updatePrice
    } else {
        const couponCode = document.getElementById('coupon-code').value;
        // console.log(couponCode);
        document.getElementById('coupon-code').value = "";
        if (couponCode == "NEW15") {
            const discount = updatePrice * .15
            document.getElementById('discount-price').innerText = - discount
            document.getElementById('grand-total').innerText = updatePrice - discount
            document.getElementById('coupon-field').classList.add('hidden')
        } else if (couponCode == "couple20") {
            const discount = updatePrice * .20
            document.getElementById('discount-price').innerText = - discount
            document.getElementById('grand-total').innerText = updatePrice - discount
            document.getElementById('coupon-field').classList.add('hidden')
        } else {
            alert("Enter Valid Coupon Code")
        }

    }

}


document.getElementById('coupon-code').addEventListener('keyup', function (e) {
    const tatolPriceValue = document.getElementById('total-price').innerText
    // console.log(tatolPriceValue);
    if (tatolPriceValue > 1 && e.target.value === "NEW15" || e.target.value === "couple20") {
        document.getElementById('applyBtn').removeAttribute('disabled', true)
    }
})