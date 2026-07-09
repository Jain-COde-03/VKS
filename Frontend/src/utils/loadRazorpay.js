const loadRazorpay = () => new Promise((resolve, reject) => {
    if (typeof window === 'undefined') return reject(new Error('Not in a browser'))
    if (window.Razorpay) return resolve(window.Razorpay)

    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.async = true
    script.onload = () => resolve(window.Razorpay)
    script.onerror = () => reject(new Error('Failed to load Razorpay SDK'))
    document.body.appendChild(script)
})

export default loadRazorpay
