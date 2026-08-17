FROM public.ecr.aws/lambda/nodejs:24 AS builder
WORKDIR /usr/app
COPY package.json package.json
COPY package-lock.json package-lock.json
COPY tsconfig.json tsconfig.json
RUN npm install
COPY . .
RUN npm run build
    
FROM public.ecr.aws/lambda/nodejs:24
WORKDIR ${LAMBDA_TASK_ROOT}
COPY --from=builder /usr/app/dist/ ./
COPY --from=builder /usr/app/node_modules ./node_modules
CMD ["lambda.handler"]

 