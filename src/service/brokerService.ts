import amqlib from 'amqplib'
import emailSenderService from './emailSenderService'

const start = async () => {
  try {
    if (!process.env.MESSAGE_QUEUE) throw Error('"MESSAGE_QUEUE" environment variable is not set')
    if (!process.env.QUEUE_NAME) throw Error('"QUEUE_NAME" environment variable is not set')

    const MESSAGE_QUEUE = process.env.MESSAGE_QUEUE
    const QUEUE_NAME = process.env.QUEUE_NAME

    const connection = await amqlib.connect(MESSAGE_QUEUE)
    const channel = await connection.createChannel()
    await channel.assertQueue(QUEUE_NAME, { durable: true })

    await channel.prefetch(1)

    channel.consume(QUEUE_NAME, async msg => {
      if (msg) {
        const content = msg.content.toString()
        const task = content ? JSON.parse(content) : null

        if (task) {
          emailSenderService.send(task.emailTo, task.subject, task.message, (err: Error) => {
            if (err) {
              console.error(err)

              return channel.nack(msg)
            } else {
              return channel.ack(msg)
            }
          })
        }
      }
    })
  } catch (error) {
    console.error(error)
  }
}

export { start }