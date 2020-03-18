import React, { Component, Fragment } from 'react'
import Info from '@ali/wind-rc-info'
import Button from '@ali/wind/lib/button'

export default class Basic extends Component {
  render() {
    return (
      <div>
        <h3>普通</h3>
        <Info title="信息区块" extra="Little Finger">
          混乱不是深渊。混乱是阶梯。很多人想往上爬 却失败了，且永无机会再试。失败毁了他们。有人本有机会攀爬，但他们拒绝了。他们守着王国不放，守着诸神，守着爱情。尽皆幻想。唯有阶梯才是真实的。努力攀爬才是一切。
        </Info>
        <Info title="信息区块" extra="Little Finger">
          混乱不是深渊。混乱是阶梯。很多人想往上爬 却失败了，且永无机会再试。失败毁了他们。有人本有机会攀爬，但他们拒绝了。他们守着王国不放，守着诸神，守着爱情。尽皆幻想。唯有阶梯才是真实的。努力攀爬才是一切。
          <div>
            <Button type="primary">Game of Thrones</Button>
          </div>
        </Info>
      </div>
    )
  }
}
